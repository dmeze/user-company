import CompanyService from "./companyService.js";

const CompanyController = {
  async create(req, res) {
    try {
      const company = await CompanyService.create(req.body);
      res.json(company);
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
  async getCompanies(req, res) {
    try {
      const companies = await CompanyService.getCompanies();
      return res.json(companies);
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
  async getCompany(req, res) {
    try {
      const company = await CompanyService.getCompany(req.params.id);
      return res.json(company);
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
  async update({ body }, res) {
    try {
      const updatedCompany = await CompanyService.update(body);
      return res.json(updatedCompany);
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
  async delete(req, res) {
    try {
      console.log(req.params);
      const company = await CompanyService.delete(req.params.id);
      return res.json(company);
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
};

export default CompanyController;
