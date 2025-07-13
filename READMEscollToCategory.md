ScrollToCategoryMenu Component
A smooth-scrolling navigation component for Framer that automatically highlights the active section as users scroll through your page.

🎛️ Property Controls
Categories

Type: Array of objects
Required: Yes
Structure: Each category needs:

id: String - Must match HTML element ID
name`: String - Display text for the button



Layout Controls
Direction

Options: Horizontal (row) | Vertical (column)
Default: Horizontal
Use: Choose button layout orientation

Gap

Type: Number
Default: 8
Use: Space between buttons in pixels

Padding

Type: Fused Number
Default: 0
Options:

"All Sides" - Same padding on all sides
"Per Side" - Individual control for top, right, bottom, left



Scroll Behavior
Offset Y

Type: Number
Default: 0
Use: Pixels to offset from top when scrolling
Example: Set to 80 if you have an 80px fixed header

Styling Controls
Active Color

Type: Color
Default: #007aff (blue)
Use: Background color for the currently active button

Inactive Color

Type: Color
Default: #ccc (gray)
Use: Background color for inactive buttons

Font

Type: Font
Default: Host Grotesk, 24px, medium weight
Controls: Full typography controls available

📋 Setup Checklist

 Component added to canvas
 Page sections have matching IDs
 Categories configured with correct IDs and labels
 Offset adjusted for fixed headers (if any)
 Colors customized to match design
 Layout direction set appropriately

⚙️ Advanced Configuration
Fixed Header Compensation
If you have a fixed header, set the Offset Y to your header height:

60px header → Offset Y: 60
80px header → Offset Y: 80

Responsive Considerations

Use Horizontal direction for desktop navigation
Consider Vertical direction for mobile sidebars
Adjust Gap and Padding for different screen sizes

Custom Styling

Buttons automatically get white text color
Border radius can be controlled via component properties
Smooth transitions are built-in (0.2s background color)

🔧 Troubleshooting
Button Not Highlighting
Issue: Clicked button doesn't become active
Solution:

Check that HTML element ID exactly matches category ID
Verify element exists on the page
Ensure Offset Y is appropriate for your layout

Scrolling to Wrong Position
Issue: Scroll position is off
Solution:

Adjust Offset Y to account for fixed headers
Check for CSS that might affect element positioning
Ensure target elements are properly positioned

Categories Not Appearing
Issue: No buttons showing
Solution:

Verify categories array is properly configured
Check that both ID and name are filled for each category
Ensure component has sufficient width/height

🎨 Styling Tips
Color Combinations

Blue Theme: Active: #007aff, Inactive: #e5e5e5
Dark Theme: Active: #ffffff, Inactive: #333333
Brand Colors: Use your brand primary for active state

Typography

Clean Look: Use system fonts with medium weight
Modern Feel: Try geometric fonts like "Avenir" or "Proxima Nova"
Readable Size: 16-24px works well for most layouts

Button Spacing

Tight: Gap: 4-6px
Comfortable: Gap: 8-12px
Spacious: Gap: 16-24px