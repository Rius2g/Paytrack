using System.Security.Cryptography;
using System.Text;
using backend.Models;
using backend.Database;

namespace backend.Security
{
	public class PasswordHash
	{
		const int keySize = 64;
		const int iterations = 300000;
		HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;
		private readonly MyDbContext _context;

		public PasswordHash(MyDbContext context)
		{
			_context = context;
		}

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

		public string GetPasswordForUser(string email)
		{
			var user = _context.Users.FirstOrDefault(u => u.Email == email);
			if(user == null || user.Password == null)
			{
				return "";
			}
			return user.Password;
		}

		public int GetIDForUser(string email)
		{
			var userid = _context.Users.Where(u => u.Email == email).Select(u => u.ID).FirstOrDefault();

			if (userid == 0)
			{
				return 0;
			}
			return userid;
		}

		public string GetSaltForUser(string username)
		{
			var id = GetIDForUser(username);
			var salt = _context.Salts.FirstOrDefault(s => s.UiD == id);
			if (salt == null || salt.Salt == null)
			{
				return "";
			}

			return salt.Salt;
		}

		public bool PostSalt(int uID, byte[] salt_hex)
		{
			var salt = Convert.ToHexString(salt_hex);
			_context.Salts.Add(new Salts { UiD = uID, Salt = salt });
			_context.SaveChanges();

			return true;
		}

		public bool PostSalt(string username, byte[] salt_hex)
		{
			var UiD = GetIDForUser(username);
			return PostSalt(UiD, salt_hex);

		}

		public string HashPassword(string password, string username)
		{
			var hash = CreateHashPassword(password, out var salt);
			var UiD = GetIDForUser(username);
			var result = PostSalt(UiD, salt);

			return hash;
		}

		public bool VerifyPassword(string password, string username)
		{
			var salt = GetSaltForUser(username);
			var hash = GetPasswordForUser(username);

			return VerifyPasswordHash(password, hash, Convert.FromHexString(salt));
		}

		public bool DeleteSalt(int id)
		{
			var salt = _context.Salts.FirstOrDefault(s => s.ID == id);
			if (salt == null)
			{
				return false;
			}
			_context.Salts.Remove(salt);
			_context.SaveChanges();

			return true;
		}

		public bool DeleteSalt(string username)
		{
			var id = GetIDForUser(username);
			var salt = _context.Salts.FirstOrDefault(s => s.UiD == id);
			if (salt == null)
			{
				return false;
			}
			_context.Salts.Remove(salt);
			_context.SaveChanges();
			return true;
		}
	}
}


