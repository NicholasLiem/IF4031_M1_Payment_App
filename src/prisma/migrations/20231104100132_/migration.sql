-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'UNPAID');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "bookingID" INTEGER,
    "eventID" INTEGER,
    "customerID" INTEGER,
    "paymentURL" TEXT,
    "paymentStatus" "PaymentStatus",

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
