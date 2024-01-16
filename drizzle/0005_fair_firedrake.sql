CREATE TABLE IF NOT EXISTS "friends" (
	"user1Id" text NOT NULL,
	"user2Id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "authorId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "conversation" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friends" ADD CONSTRAINT "friends_user1Id_user_id_fk" FOREIGN KEY ("user1Id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friends" ADD CONSTRAINT "friends_user2Id_user_id_fk" FOREIGN KEY ("user2Id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
