-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('SUCCESS', 'FAILED', 'PENDING');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "bookingID" UUID NOT NULL,
    "eventID" INTEGER NOT NULL,
    "customerID" INTEGER NOT NULL,
    "seatID" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "paymentURL" TEXT NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
