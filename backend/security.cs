using System;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Data.Sqlite;
using Dapper;

namespace backend.Security;

public class PasswordHash
{
	const int keySize = 64;
	const int iterations = 300000;
	HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;

	public string CreateHashPassword(string password, out byte[] salt)
	{

		salt = RandomNumberGenerator.GetBytes(keySize);

		var hash = Rfc2898DeriveBytes.Pbkdf2(
			Encoding.UTF8.GetBytes(password),
			salt,
			iterations,
			hashAlgorithm,
			keySize);

		return Convert.ToHexString(hash);
	}

	public bool VerifyPasswordHash(string password, string hash, byte[] salt)
	{
        var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(password, salt, iterations, hashAlgorithm, keySize);

        return hashToCompare.SequenceEqual(Convert.FromHexString(hash));
    }

	public string GetPasswordForUser(string username, string DBname)
	{
        using var connection = new SqliteConnection(DBname);
		var password = connection.QuerySingleOrDefault<string>(@"
			SELECT Password
				FROM Users
				WHERE UserName = @Username;",
				new
				{
					Username = username,
				});

		return password;
    }

	public int GetIDForUSer(string username, string DBname)
	{
        using var connection = new SqliteConnection(DBname);
		var id = connection.QuerySingleOrDefault<int>(@"
			SELECT UserID
				FROM Users
				WHERE UserName = @Username;",
				new
				{
					Username = username
				});

        return id;
    }

	public string GetSaltForUser(string username, string DBname)
	{
		var id = GetIDForUSer(username, DBname);

        using var connection = new SqliteConnection(DBname);
        var salt = connection.QuerySingleOrDefault<string>(@"
			SELECT Salt
				FROM Salts
				WHERE UserID = @Id;",
				new
				{
					Id = id,
				});

		return salt;
    }

	public bool PostSalt(int uID, byte[] salt_hex, string DBname)
	{
		var salt = Convert.ToHexString(salt_hex);
		using var connection = new SqliteConnection(DBname);
		var result = connection.Execute(@"
                INSERT OR IGNORE INTO Salts (
                        UserID,
                        Salt
                    ) VALUES (
                        @UserID,
                        @Salt
                        )
                        RETURNING *;",

                new
                {
                    UserID = uID,
					Salt = salt,
                });

        return result == 1;
    }

	public bool PostSalt(string username, byte[] salt_hex, string DBname)
	{
		var uID = GetIDForUSer(username, DBname);
		return PostSalt(uID, salt_hex, DBname);

	}

	public string HashPassword(string password, string username, string DBname)
	{
		var hash = CreateHashPassword(password, out var salt);
		var uID = GetIDForUSer(username, DBname);
		var result = PostSalt(uID, salt, DBname);

		return hash;
	}

	public bool VerifyPassword(string password, string username, string DBname)
	{
		var salt = GetSaltForUser(username, DBname);
		var hash = GetPasswordForUser(username, DBname);

		return VerifyPasswordHash(password, hash, Convert.FromHexString(salt));
	}

	public bool DeleteSalt(int id, string DBname)
	{
		var connection = new SqliteConnection(DBname);
        var result = connection.Execute(                                                                                                                             // query the database to delete a user
            @"DELETE FROM Salts
                    WHERE UserID = @IdInsert;",
            new { IdInsert = id });

		return result == 1;
    }

    public bool DeleteSalt(string username, string DBname)
    {
        var id = GetIDForUSer(username, DBname);

        var connection = new SqliteConnection(DBname);
        var result = connection.Execute(                                                                                                                             // query the database to delete a user
            @"DELETE FROM Salts
                    WHERE UserID = @IdInsert;",
            new { IdInsert = id });

        return result == 1;
    }
}


