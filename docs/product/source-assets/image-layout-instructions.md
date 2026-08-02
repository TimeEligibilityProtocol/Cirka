# wearto.you — mandatory mobile/desktop product image standard

Source: provided by the owner, modeled on Ounass/Net-a-Porter conventions. Archived verbatim for provenance — see `image-layout-spec.json` for the machine-readable values this instructs Claude Code to apply exactly (not to improvise proportions, column counts, heights, or crop behavior).

Applies everywhere product images render: feed/search, saved items, seller profile, product page, admin order/listing panels, demo and future real listings.

Key mandates (full detail in the JSON):
- One product aspect ratio everywhere: 4:5. Master 2400×3000, minimum accepted 1200×1500, container background `#E9D8C2`. Never stretch; never use square/landscape product cards.
- Backend generates thumb/card-sm/card-md/card-lg/detail/detail-hd/master variants (WebP, master as PNG), with target file-size ceilings — not enforced quality floors below which texture/stitching/defects stop being visible.
- Feed breakpoints: 2 columns under 768px (12/16px padding), 3 columns 768–1023px, 4 columns from 1024px, capped at 1440px content width from 1440px viewport up — never auto-scale to more, smaller cards to fit extra columns.
- Product card order: image (4:5) → brand (if any) → short title → condition → price in AED. No text/price overlaid on the photo; only a save/heart button may sit on the image (36×36 mobile / 40×40 desktop, 10–12px inset). Full card tappable; 44×44px minimum touch target. Loading skeleton keeps the 4:5 ratio to avoid layout shift.
- Product page: mobile is a single full-width 4:5 snap-carousel (`contentFit: contain`, since container and photo background match, so contain never looks like a foreign frame); desktop from 1024px is a two-column layout (page max 1360px, ~60/40 gallery/details split, 48–64px gap, sticky details panel, main image ≤720px wide, 88×110px thumbnails, active thumbnail gets a burgundy-brown border, click-to-zoom using the `detail-hd` variant not the feed file).
- Cropping must leave a 6–10% safe margin and never cut a bag handle, a shoe tip/heel, or a dress hanger/hem. No generative extension of a product that doesn't fully fit the frame — ask for a reshoot instead.
- Real alt text per photo (e.g. "Burgundy suede shoulder bag, front view"), never a filename; heart button and gallery controls need screen-reader labels; thumbnail/zoom navigation must work by keyboard too.
- One shared implementation: `ProductImage`, `ProductCardImage`, `ProductGallery`, `ProductImageZoom` components pulling ratios/breakpoints from a single token source — not reimplemented per screen.
- Required visual test widths: 360, 390, 768, 1024, 1440px, checking column count, 4:5 integrity, no cropping, no stretching, no layout shift while loading, working gallery/zoom, and correct (non-repeated) image per product.
- Not done until: every breakpoint is correct, the product page has proper mobile/desktop layouts, every product uses the right image variant, 2400×3000 masters never load in the feed, no major layout shift from images, and screenshots from the five approved widths have been shown for sign-off.

Check the Expo/`expo-image` version already in the repo before adding it — don't upgrade Expo just for this task.
