#!/bin/bash
echo "Attempting npm installation..."
npm i -y || { echo "npm installation failed." >&2; exit 1; }

echo "Attempting type generation for db connection..."
npm run gen-db || { echo "Type generation for db connection failed." >&2; exit 1; }

echo "Starting development server..."
npm run dev