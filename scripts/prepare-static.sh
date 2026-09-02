#!/usr/bin/env bash
#
# Strips the server-dependent half of the application so the marketing site can
# be exported as plain files for GitHub Pages.
#
# DESTRUCTIVE — it edits the working tree in place. That is fine in CI, where
# the checkout is thrown away afterwards. To run it locally, restore with:
#   git checkout -- . && git clean -fd
#
set -euo pipefail

echo "Removing everything that needs a server…"

# The CMS portal, its server actions and the components that call them.
rm -rf src/app/portal
rm -rf src/app/api
rm -rf src/app/actions
rm -rf src/components/portal
rm -f  src/middleware.ts
rm -f  src/lib/portal/auth.ts

# Swap the enquiry form for the variant that posts to WhatsApp and email.
mv src/components/site/LeadForm.offline.tsx src/components/site/LeadForm.tsx

# The footer links to the portal, which no longer exists in this build.
python3 - <<'PY'
from pathlib import Path
p = Path("src/components/site/Footer.tsx")
s = p.read_text(encoding="utf-8")
s = s.replace("""            <li>
              <Link href="/portal" className="text-[0.78rem] text-ash transition-colors hover:text-ceramic">
                Portal
              </Link>
            </li>
""", "")
p.write_text(s, encoding="utf-8")
PY

echo "Done. The tree now contains the marketing site only."
