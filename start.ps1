# Naksh Jewels E-Commerce - Quick Start Guide

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Naksh Jewels E-Commerce Setup" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Docker
Write-Host "Checking Docker installation..." -ForegroundColor Green
if (Get-Command docker -ErrorAction SilentlyContinue) {
    Write-Host "✓ Docker is installed" -ForegroundColor Green
    docker --version
} else {
    Write-Host "✗ Docker is not installed. Please install Docker Desktop." -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check Docker Compose
Write-Host "Checking Docker Compose..." -ForegroundColor Green
if (Get-Command docker-compose -ErrorAction SilentlyContinue) {
    Write-Host "✓ Docker Compose is installed" -ForegroundColor Green
    docker-compose --version
} else {
    Write-Host "✗ Docker Compose is not installed." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Application with Docker" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Building and starting containers..." -ForegroundColor Green
Write-Host "This may take a few minutes on first run..." -ForegroundColor Yellow
Write-Host ""

docker-compose up --build

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Application is running!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Backend API: http://localhost:5000/api" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the application" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
