# Profile Account Settings Screens - Testing Brief

**Status**: Ready for QA Testing  
**Created**: 2026-03-29  
**Pages**: 8 new screens + 1 modified parent page

## Overview
All 8 account settings sub-screens have been implemented and integrated with navigation routing. The account-settings main page now includes handlers for all menu items.

## Test Environment Setup
```bash
# Start the dev server
pnpm dev
# Navigate to the profile
http://localhost:3000/profile/account-settings
```

## Test Cases

### Test Suite 1: Navigation & Routing

#### Test 1.1: Account Settings Main Page Loads
- [ ] Navigate to `/profile/account-settings`
- [ ] Verify header shows "Account Settings"
- [ ] Verify back button is visible and functional
- [ ] Verify all menu items are visible:
  - General section: Notifications, Personal Information, Coach Contact, Language, Dark Mode, Linked Devices
  - Security & Privacy section: Main Security, Enable Biometric, Privacy Policy
  - Help & Support section: About Us, Help Center, Submit Feedback
  - Danger Zone: Close Account
  - Log Out: Sign Out

#### Test 1.2: Notification Settings Navigation
- [ ] Click "Notifications" menu item
- [ ] Verify page routes to `/profile/account-settings/notification-settings`
- [ ] Verify "Notification Settings" header is displayed
- [ ] Click back button → returns to Account Settings
- [ ] Verify page is not in loading state

#### Test 1.3: Security Settings Navigation
- [ ] Click "Main Security" menu item
- [ ] Verify page routes to `/profile/account-settings/security-settings`
- [ ] Verify "Security Settings" header is displayed
- [ ] Verify shield icon is visible in the center
- [ ] Click back button → returns to Account Settings

#### Test 1.4: Linked Devices Navigation
- [ ] Click "Linked Devices" menu item
- [ ] Verify page routes to `/profile/account-settings/linked-devices`
- [ ] Verify "Linked Devices" header is displayed
- [ ] Click back button → returns to Account Settings

#### Test 1.5: About Us Navigation
- [ ] Click "About Us" menu item
- [ ] Verify page routes to `/profile/account-settings/about-us`
- [ ] Verify "About Us" header is displayed
- [ ] Click back button → returns to Account Settings

#### Test 1.6: Help Center Navigation
- [ ] Click "Help Center" menu item
- [ ] Verify page routes to `/profile/account-settings/help-center`
- [ ] Verify "Help Center" header is displayed
- [ ] Click back button → returns to Account Settings

#### Test 1.7: Submit Feedback Navigation
- [ ] Click "Submit Feedback" menu item
- [ ] Verify page routes to `/profile/account-settings/feedback`
- [ ] Verify "Submit Feedback" header is displayed
- [ ] Click back button → returns to Account Settings

### Test Suite 2: Notification Settings Screen

#### Test 2.1: General Section Toggles
- [ ] "Push Notifications" toggle is enabled (orange)
- [ ] Click toggle → state changes to disabled (gray)
- [ ] Click toggle → state changes back to enabled
- [ ] "AI Coach Notification" toggle is disabled
- [ ] Click toggle → state changes to enabled
- [ ] "Metrics Notification" toggle is enabled

#### Test 2.2: Sound Section
- [ ] "Vibrations" toggle has descriptive text below
- [ ] Descriptive text reads: "When Vibrate Notifications are on, your phone will vibrate."
- [ ] "Sound" toggle has descriptive text
- [ ] Descriptive text reads: "When Sound Notifications are on, your phone will always check for sounds."

#### Test 2.3: Misc Section
- [ ] "Offers" row shows "iPhone 14 Pro →" as value
- [ ] "App Update" toggle is enabled
- [ ] "Resources" toggle is disabled with descriptive text
- [ ] Descriptive text: "Enable resource notification when there's a new resources."

#### Test 2.4: Save Settings Button
- [ ] Button is visible at bottom
- [ ] Button text: "Save Settings ✓"
- [ ] Click button → navigates back to Account Settings
- [ ] Button has active/hover states

### Test Suite 3: Security Settings Screen

#### Test 3.1: Security Header & Icon
- [ ] "Security Settings" header is displayed
- [ ] Shield icon is visible and centered
- [ ] Icon has gray background circle

#### Test 3.2: General Section Toggles
- [ ] "2 Factor Authenticator" toggle is disabled
- [ ] Has descriptive text: "2FA is an identity and access management security method."
- [ ] "Google Authenticator" toggle is enabled (orange)
- [ ] Has descriptive text: "Google Authenticator adds an extra layer of security."
- [ ] "Face ID" toggle is disabled
- [ ] Has descriptive text: "Face ID lets you securely unlock your iPhone or iPad."
- [ ] "Biometric Unlock" toggle is enabled
- [ ] Has descriptive text: "The biometric unlock feature can be achieved through visiting our website directly."

#### Test 3.3: Save Settings Button
- [ ] Button is visible at bottom
- [ ] Button text: "Save Settings ✓"
- [ ] Click button → navigates back to Account Settings

### Test Suite 4: Linked Devices Screen

#### Test 4.1: Device Display
- [ ] Device "Xiaomi Watch 8" is displayed
- [ ] Device icon (⌚) is visible and large
- [ ] Connected status shows ✓ and "Connected"
- [ ] Battery percentage shows "◆ 98%"

#### Test 4.2: Device Action Buttons
- [ ] Three black circular buttons below device name
- [ ] First button has ⚡ icon (Stats)
- [ ] Second button has ⚙ icon (Settings)
- [ ] Third button has 📷 icon (Camera)
- [ ] Buttons have hover/active states
- [ ] Buttons are responsive to touch/click

#### Test 4.3: Add Device Button
- [ ] "Add New Device" button is visible at bottom
- [ ] Button has black border, white background
- [ ] Button text: "+ Add New Device"
- [ ] Button has hover states

### Test Suite 5: About Us Screen

#### Test 5.1: Company Information
- [ ] Orange "+" icon in rounded square is visible
- [ ] Company name: "sandow.ai" is displayed
- [ ] Tagline: "AI Fitness & Training Solution" is shown

#### Test 5.2: Contact Cards
- [ ] "Address" card shows location icon
- [ ] Address text: "578 Boolean Ave", "Turing St", "New York, NY"
- [ ] "Telephone" card shows phone icon
- [ ] Phone numbers: "+123-456-789", "+44-887-449"

#### Test 5.3: Social Links
- [ ] "Follow Us" section is visible
- [ ] Four social icons are displayed: Facebook, Instagram, LinkedIn, YouTube
- [ ] Icons have gray background
- [ ] Icons have hover states (hover shows orange background/white icon)
- [ ] Social links point to correct URLs

### Test Suite 6: Help Center Screen

#### Test 6.1: Tab Navigation
- [ ] Two tabs visible: "FAQ" and "Live Chat"
- [ ] FAQ tab is active by default (darker background)
- [ ] Click "Live Chat" tab → switches to live chat view
- [ ] Click "FAQ" tab → switches back to FAQ view
- [ ] Tab switching is smooth

#### Test 6.2: FAQ Tab Content
- [ ] Search bar is visible with orange border
- [ ] Search bar has magnifying glass icon
- [ ] Placeholder text: "Search our FAQ..."
- [ ] Type in search bar → updates visible items (if search implemented)
- [ ] First FAQ: "What is sandow.ai?" is expanded by default (black background, white text)
- [ ] Expanded FAQ shows answer text
- [ ] Collapsed FAQs have gray background, chevron icon points right
- [ ] Click collapsed FAQ → expands (shows answer, chevron rotates)
- [ ] Click expanded FAQ → collapses
- [ ] All 6 FAQ items are visible:
  1. "What is sandow.ai?"
  2. "How does Sandow AI work?"
  3. "Is Sandow AI a replacement for fitness coach?"
  4. "Is Sandow AI free to use?"
  5. "Is my data secure?"
  6. "How does Sandow AI work?" (duplicate intentional)

#### Test 6.3: Live Chat Tab Content
- [ ] Message/chat icon is visible
- [ ] Heading: "We are here to help you with your fitness needs!"
- [ ] Subtext: "We aim to reply within a few minutes! 😍"
- [ ] "Start Live Chat →" button is visible
- [ ] Click button → navigates to `/profile/account-settings/live-chat`

### Test Suite 7: Live Chat Screen

#### Test 7.1: Chat Header
- [ ] Orange background for header
- [ ] Back button visible (lighter orange background)
- [ ] "Live Chat" heading centered
- [ ] Proper contrast and readability

#### Test 7.2: Message Thread
- [ ] Multiple messages are displayed in a scrollable area
- [ ] User messages (right side): Dark background, white text
- [ ] Support messages (left side): Gray background, dark text
- [ ] Timestamps shown on each message ("10:00 AM", etc.)
- [ ] Messages scroll to bottom automatically
- [ ] Message order is chronological

#### Test 7.3: Message Content
Verify each message displays correctly:
- [ ] User: "Hello! I'm having trouble with my account..."
- [ ] Support: "Hello Makisi! We have notified the dev team..."
- [ ] User: "Amazing, thanks a lot! It works now..."
- [ ] Support: "No problem!"

#### Test 7.4: Input Area
- [ ] Input bar at bottom is visible
- [ ] Four elements in input row:
  - Paper clip icon (file attachment)
  - Input field with placeholder "Type to start chatting..."
  - Send button (blue, with arrow icon)
- [ ] Input field is focused when page loads
- [ ] Type text → text appears in input
- [ ] Press Enter → message should send (if implemented)
- [ ] Click send button → message sends
- [ ] Input field clears after sending

### Test Suite 8: Submit Feedback Screen

#### Test 8.1: Feedback Header
- [ ] Dark gray background
- [ ] White "Submit Feedback" heading
- [ ] Back button visible
- [ ] Proper spacing and layout

#### Test 8.2: Emoji & Question
- [ ] Large emoji (😊) in black rounded square
- [ ] Heading: "Which of the area needs improvement?"
- [ ] Text is centered and large (24px)

#### Test 8.3: Category Buttons
- [ ] All 10 categories visible in grid layout:
  1. "Performance" (blue button)
  2. "Support" (gray button)
  3. "Bug" (purple button)
  4. "UI" (gray button)
  5. "UX" (gray button)
  6. "Crashes" (green button)
  7. "Loading" (gray button)
  8. "Navigation" (orange button)
  9. "Leadership" (gray button)
  10. "Pricing" (gray button)
- [ ] Buttons have appropriate colors as shown
- [ ] Click category → button becomes selected (white ring)
- [ ] Click different category → previous selection deselected
- [ ] Only one category can be selected at a time

#### Test 8.4: Submit Button
- [ ] Button is visible at bottom
- [ ] Button disabled state (gray) when no category selected
- [ ] Click category → button becomes enabled (black, white text)
- [ ] Button text: "Submit Feedback →"
- [ ] Click button → navigates back to Account Settings
- [ ] Disabled button doesn't navigate

### Test Suite 9: Animation & Transitions

#### Test 9.1: Page Transitions
- [ ] Smooth fade-in animation when entering new page
- [ ] Smooth fade-out when exiting
- [ ] Back navigation is smooth

#### Test 9.2: Toggle Animations
- [ ] Toggle switches have smooth sliding animation
- [ ] Toggle slides left/right based on state
- [ ] Animation duration is ~300ms

#### Test 9.3: Button Interactions
- [ ] Buttons have hover scale effect (1.02x)
- [ ] Buttons have tap/click scale effect (0.98x)
- [ ] Effects are smooth with spring physics

### Test Suite 10: Responsive Design

#### Test 10.1: Mobile Layout (375px - 390px)
- [ ] All screens display correctly on mobile
- [ ] Text is readable without horizontal scroll
- [ ] Buttons are large enough to tap (44px+ height)
- [ ] Spacing is appropriate for mobile
- [ ] Back button is accessible

#### Test 10.2: Tablet Layout (768px+)
- [ ] Screens scale appropriately
- [ ] Layout doesn't break
- [ ] Text remains readable

#### Test 10.3: Touch Targets
- [ ] All interactive buttons are at least 44x44px
- [ ] Sufficient spacing between touch targets
- [ ] No accidentally overlapping touch areas

### Test Suite 11: Accessibility

#### Test 11.1: Screen Reader
- [ ] All buttons have aria-labels
- [ ] Toggle states are announced properly
- [ ] Navigation is logical top-to-bottom

#### Test 11.2: Keyboard Navigation
- [ ] All interactive elements receive focus
- [ ] Tab order is logical
- [ ] Enter key activates buttons
- [ ] Space key toggles checkboxes/toggles

#### Test 11.3: Color Contrast
- [ ] Text meets WCAG AA standards (4.5:1)
- [ ] Toggle colors are distinguishable

## Known Limitations
- Auth link type error pre-exists (not related to these screens)
- Live chat and feedback submission are UI only (no backend hooks implemented)
- Help center search is not functional (UI placeholder)

## Sign-Off Checklist
- [ ] All navigation routes work correctly
- [ ] All screens display without errors
- [ ] TypeScript compilation passes
- [ ] All test suites pass
- [ ] Responsive design verified on mobile/tablet
- [ ] Accessibility checks pass
- [ ] Ready for code review

---

**Next Steps**: Once testing is complete, assign to @reviewer for code review, then prepare for staging deployment.
