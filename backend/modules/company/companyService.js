import Company from "./company.js";

const CompanyService = {
  async create(company) {
    return Company.create(company);
  },
  async getCompanies() {
    return Company.find();
  },
  async getCompany(id) {
    if (!id) {
      throw new Error("Id is required.");
    }
    return Company.findById(id);
  },
  async update(company) {
    if (!company._id) {
      throw new Error("Id is required.");
    }
    return Company.findByIdAndUpdate(company._id, company, { new: true });
  },
  async delete(id) {
    if (!id) {
      throw new Error("Id is required.");
    }
    return Company.findByIdAndDelete(id);
  },
};

export default CompanyService;
