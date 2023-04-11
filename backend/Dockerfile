FROM mcr.microsoft.com/dotnet/sdk:7.0 as builder

WORKDIR /source

COPY . .

RUN dotnet restore "./backend.csproj" --disable-parallel
RUN dotnet publish "./backend.csproj" -c release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/sdk:7.0

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 5000

ENTRYPOINT [ "dotnet", "backend.dll" ]

