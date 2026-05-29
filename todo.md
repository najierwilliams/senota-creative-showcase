# SENOTA Project TODO

## Authentication & Login System
- [x] Database schema: users table with roles (user, employee, circle, admin)
- [x] Database schema: customer tables (digital_magazines, user_magazines, course_enrollments)
- [x] Database schema: employee tables (training_modules, employee_training_progress, announcements)
- [x] Database schema: circle tables (circle_posts, circle_post_likes, circle_events, circle_event_rsvps, circle_perks)
- [x] tRPC backend procedures for customer dashboard (magazines, courses, profile)
- [x] tRPC backend procedures for employee dashboard (training modules, progress, announcements)
- [x] tRPC backend procedures for circle dashboard (posts, likes, events, RSVPs, perks, announcements)
- [x] Customer Dashboard page (/dashboard/customer) — magazine library, courses, profile
- [x] Employee Dashboard page (/dashboard/employee) — training tracker, announcements, profile
- [x] The Circle VIP Dashboard page (/dashboard/circle) — feed, VIP events, perks, updates
- [x] SiteHeader: role-aware Sign In button (unauthenticated)
- [x] SiteHeader: account dropdown with "My Dashboard" + "Sign Out" (authenticated)
- [x] SiteHeader: mobile drawer account/login section
- [x] App.tsx routes: /dashboard/customer, /dashboard/employee, /dashboard/circle

## Site Pages (Previously Built)
- [x] Homepage (/)
- [x] Creative Showcase (/creatives)
- [x] Community page (/community)
- [x] Advertising page (/advertising)
- [x] Academy page (/academy)
- [x] Academy enrollment (/academy/enroll)
- [x] About page (/about)
- [x] Contact page (/contact)
- [x] Submit work page (/submit)
- [x] Privacy policy (/privacy)

## Future Enhancements
- [ ] Admin panel for managing users, roles, magazine uploads, training content
- [ ] Stripe payment integration for digital magazine purchases
- [ ] Magazine PDF download after purchase (S3 storage)
- [ ] Course video player in customer dashboard
- [ ] Circle member invite / application flow
- [ ] Employee onboarding checklist
- [ ] Push notifications for announcements
- [ ] Magazine subscription / recurring billing
