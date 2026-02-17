-- Create News table
CREATE TABLE IF NOT EXISTS "News" (
  "id" SERIAL PRIMARY KEY,
  "content" TEXT NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "order" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert default news items
INSERT INTO "News" ("content", "isActive", "order") VALUES
('Montessori + Reggio Emilia Inspired Learning — A unique blend of play-based and workstation-style education.', true, 1),
('Explore Our Workstations! Art • Literacy • Science • Sensory • Math — hands-on learning at its best.', true, 2),
('✨ Registration Open for 2026–27! Give your child the best start—limited seats available. Enroll now and enjoy a special fee discount!', true, 3);
