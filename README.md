# interactiveMenu
framer code component

🧾 Interactive Menu for Framer
The InteractiveMenu is a powerful, scrollable, image-pinned restaurant-style menu component designed for Framer. It lets users display categorized food items with rich styling and layout control—all customizable through the Framer UI.

🚀 How to Use
1. Insert the Component
Drag the InteractiveMenu component onto your canvas.

Resize or position it as needed.

2. Add Menu Data
In the Property Panel, scroll to Menu Items.

Use the array interface to add multiple items.

Each item includes:

Name, Food No., Slug, Category, Image, Descriptions, Price (€)

Optional tags like Vegetarian, Spicy, Allergens, Quantity

3. Control Category Order
Use the Order Category field to set custom ordering of categories.

Enter values like SASHIMI, NIGIRI, CHIRASHI BOWL.

🎨 UI Customization Options
This component has deep customization via the property controls. Here's how to find and use each section:

📦 Layout Options (layoutOptions)
Adjust the base container layout:

Display: flex, block, inline, etc.

Flex Direction: vertical or horizontal layout.

Padding: global or per side.

Positioning: static, relative, fixed, sticky.

Border & Shadow: fully customizable with per-side widths and corner radius.

📐 Column Widths (columnWidths)
Control the widths of:

Image Column — where food images appear.

Menu Column — where items are listed.
Supports relative, fixed, fill, and fit-content.

🖼 Image Settings (imageSettings)
Control image presentation:

Dimensions: Width, Height Type, Max Width/Height.

Appearance: Object Fit, Border Radius, Box Shadow.

Animation: Transition, Transform, and Opacity.

🎯 Image Wrapper Styling (imageColumnSettings)
Style the image column wrapper (not just the image):

Padding, Borders, Background, Max Sizing

📌 Enable Pinned Image Mode {Image position should be fixed for this to work well} 
Enable Enable Pinned Styles to:

Pin the image while scrolling.

Use Pinned Container Styles, Pinned Image Styles, and Pinned Menu Column Styles to define how each section should behave and look during pinned mode.

🧱 Menu Column Styling (menuColumnSettings)
Adjust layout and design of the column that contains all menu items.

🧩 Category & Item Styling
🧭 Category Section Layouts
Each category (like “NIGIRI”) can be styled:

categorySectionLayout — padding, gap, border, etc.

categoryHeaderBox — the category label styling.

categoryDescriptionLayout — sub-text styling.

🥗 Menu Items
Individual food items are styled through:

menuItemsLayout — wrapper for all items in a category.

itemWrapperLayout — controls for each food item row.

nameDescCol, descCol — text container styles.

✨ Text Styling
Use Framer's font controls for:

Food names, descriptions, allergens, quantity, price, category titles, etc.

Font fields support full family, size, weight, and line-height adjustments.

🌈 Color Settings
Define theme colors:

backgroundColor, textColor, hoverColor, and specific colors for each label type (priceColor, allergenColor, etc.)

🖱 Interactivity
Hover (desktop): Hovering over an item highlights it and updates the image.

Tap (mobile): Tapping an item selects it and updates the image.

Image fade-in animation is based on the transition config.

🛠 Tips
💡 Use Image Column Width = 50% and Menu Column Width = 50% for a balanced split.

🧪 If images aren’t showing, double-check the image URLs.

🎨 Use Pinned Styles to create immersive layouts where images remain fixed while the menu scrolls.