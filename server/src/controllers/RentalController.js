const prisma = require('../models/prisma');

class RentalController {
  createNewForm = async (req, res, next) => {
    try {
      const formExist = await prisma.rental.findUnique()
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new RentalController();
