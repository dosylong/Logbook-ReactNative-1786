-- CreateTable
CREATE TABLE "Rental" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "property" TEXT NOT NULL,
    "bedroom" TEXT NOT NULL,
    "pickDate" TIMESTAMP(3) NOT NULL,
    "rentPrice" INTEGER NOT NULL,
    "furniture" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "reporterName" TEXT NOT NULL,

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rental_address_key" ON "Rental"("address");
