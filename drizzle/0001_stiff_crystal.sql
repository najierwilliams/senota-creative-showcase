CREATE TABLE `announcements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`content` text NOT NULL,
	`category` enum('general','urgent','event','policy') NOT NULL DEFAULT 'general',
	`targetRole` enum('all','employee','circle','admin') NOT NULL DEFAULT 'all',
	`authorId` int,
	`isPinned` boolean NOT NULL DEFAULT false,
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `announcements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `circle_event_rsvps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`eventId` int NOT NULL,
	`status` enum('going','maybe','not_going') NOT NULL DEFAULT 'going',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `circle_event_rsvps_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `circle_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`location` varchar(256),
	`isVirtual` boolean NOT NULL DEFAULT false,
	`coverUrl` text,
	`eventDate` timestamp NOT NULL,
	`rsvpDeadline` timestamp,
	`maxAttendees` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `circle_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `circle_perks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`category` varchar(64) NOT NULL,
	`code` varchar(64),
	`expiresAt` timestamp,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `circle_perks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `circle_post_likes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`postId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `circle_post_likes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `circle_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`authorId` int NOT NULL,
	`content` text NOT NULL,
	`imageUrl` text,
	`likes` int NOT NULL DEFAULT 0,
	`isPinned` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `circle_posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `course_enrollments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseId` varchar(64) NOT NULL,
	`courseName` varchar(256) NOT NULL,
	`status` enum('pending','active','completed','paused') NOT NULL DEFAULT 'pending',
	`progress` int NOT NULL DEFAULT 0,
	`enrolledAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`notes` text,
	CONSTRAINT `course_enrollments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `digital_magazines` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`issueNumber` int NOT NULL,
	`coverUrl` text,
	`fileKey` text,
	`fileUrl` text,
	`description` text,
	`publishedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `digital_magazines_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employee_training_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`moduleId` int NOT NULL,
	`status` enum('not_started','in_progress','completed') NOT NULL DEFAULT 'not_started',
	`completedAt` timestamp,
	`score` int,
	CONSTRAINT `employee_training_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `training_modules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`category` varchar(64) NOT NULL,
	`estimatedMinutes` int NOT NULL DEFAULT 30,
	`content` text,
	`order` int NOT NULL DEFAULT 0,
	`isRequired` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `training_modules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_magazines` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`magazineId` int NOT NULL,
	`purchasedAt` timestamp NOT NULL DEFAULT (now()),
	`downloadCount` int NOT NULL DEFAULT 0,
	`lastDownloadedAt` timestamp,
	CONSTRAINT `user_magazines_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','employee','circle','admin') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `avatar` text;--> statement-breakpoint
ALTER TABLE `users` ADD `bio` text;--> statement-breakpoint
ALTER TABLE `users` ADD `city` varchar(128);