#!/bin/sh

set -ex

copy_to() {
  cp node_modules/@prisma/engines/*query* "$1"
  cp prisma/schema.prisma "$1"
}

copy_to .vercel/output/functions/api.func/
copy_to .vercel/output/functions/render.func/
