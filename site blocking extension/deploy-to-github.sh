#!/bin/bash

# GitHub Deployment Script for Site Password Protector
# This script will help you deploy the extension to GitHub

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║     Site Password Protector - GitHub Deployment Helper          ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed!"
    echo "Please install git first:"
    echo "  Ubuntu/Debian: sudo apt install git"
    echo "  Fedora: sudo dnf install git"
    echo "  macOS: brew install git"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Check if already a git repository
if [ -d .git ]; then
    echo "⚠️  This folder is already a git repository"
    echo ""
    read -p "Do you want to add and commit changes? (y/n): " commit_changes
    
    if [ "$commit_changes" = "y" ]; then
        git add .
        read -p "Enter commit message: " commit_msg
        git commit -m "$commit_msg"
        
        echo ""
        echo "✅ Changes committed!"
        echo ""
        echo "To push to GitHub, run:"
        echo "  git push origin main"
    fi
else
    echo "📝 Initializing new git repository..."
    echo ""
    
    # Initialize git
    git init
    echo "✅ Git repository initialized"
    echo ""
    
    # Ask for user details
    read -p "Enter your name for git commits: " user_name
    read -p "Enter your email for git commits: " user_email
    
    git config user.name "$user_name"
    git config user.email "$user_email"
    
    echo "✅ Git user configured"
    echo ""
    
    # Add all files
    echo "📦 Adding all files to git..."
    git add .
    
    # Create initial commit
    echo "💾 Creating initial commit..."
    git commit -m "Initial commit - Site Password Protector v1.0.0"
    
    echo "✅ Initial commit created!"
    echo ""
    
    # Rename branch to main
    git branch -M main
    
    echo "════════════════════════════════════════════════════════════════════"
    echo "📌 NEXT STEPS:"
    echo "════════════════════════════════════════════════════════════════════"
    echo ""
    echo "1. Go to GitHub.com and create a new repository"
    echo "   Repository name suggestion: site-password-protector"
    echo "   Description: Browser extension to password-protect websites"
    echo ""
    echo "2. After creating the repository, copy the repository URL"
    echo "   (looks like: https://github.com/username/repo-name.git)"
    echo ""
    echo "3. Run these commands to push your code:"
    echo ""
    read -p "Enter your GitHub repository URL (or press Enter to skip): " repo_url
    
    if [ -n "$repo_url" ]; then
        git remote add origin "$repo_url"
        echo ""
        echo "✅ Remote repository added!"
        echo ""
        echo "Now pushing to GitHub..."
        echo ""
        
        if git push -u origin main; then
            echo ""
            echo "🎉 SUCCESS! Your extension is now on GitHub!"
            echo ""
            echo "View it at: ${repo_url%.git}"
        else
            echo ""
            echo "⚠️  Push failed. You may need to authenticate or check the URL."
            echo "Try running manually:"
            echo "  git push -u origin main"
        fi
    else
        echo ""
        echo "Skipped. When ready, run:"
        echo "  git remote add origin YOUR_REPO_URL"
        echo "  git push -u origin main"
    fi
fi

echo ""
echo "════════════════════════════════════════════════════════════════════"
echo "📖 Additional Tips:"
echo "════════════════════════════════════════════════════════════════════"
echo ""
echo "• Enable GitHub Pages for demo.html:"
echo "  Settings → Pages → Source: main branch"
echo ""
echo "• Add topics to your repo:"
echo "  browser-extension, chrome-extension, firefox-addon, security"
echo ""
echo "• Create releases:"
echo "  Go to Releases → Create a new release → Tag: v1.0.0"
echo ""
echo "• Full guide available in: DEPLOY_TO_GITHUB.md"
echo ""
echo "════════════════════════════════════════════════════════════════════"
echo ""
echo "🚀 Happy deploying!"
echo ""
