#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src

COPY ["Services/Login/Login.API/BuildrOps.API.csproj", "Services/Login/Login.API/"]
COPY ["Services/Login/Login.Application/BuildrOps.Application.csproj", "Services/Login/Login.Application/"]
COPY ["Services/Login/Login.Domain/BuildrOps.Domain.csproj", "Services/Login/Login.Domain/"]
COPY ["BuildingBlocks/EventBus.Messages/EventBus.Messages.csproj", "BuildingBlocks/EventBus.Messages/"]
COPY ["Services/Login/Login.Infrastructure/BuildrOps.Infrastructure.csproj", "Services/Login/Login.Infrastructure/"]
COPY ["BuildingBlocks/Common.Logging/Common.Logging.csproj", "BuildingBlocks/Common.Logging/"]
RUN dotnet restore "Services/Login/Login.API/BuildrOps.API.csproj"
COPY . .
WORKDIR "/src/Services/Login/Login.API"
RUN dotnet build "BuildrOps.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BuildrOps.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BuildrOps.API.dll"]
