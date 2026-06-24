const ContactAgency = require("../sequelize/models/contact");
 

const createContact = async (req, res) => {
  const { civilite, nom, prenom, email, telephone, motif, message, disponibilites } = req.body;

  if (!civilite || !nom || !prenom || !email || !telephone || !motif) {
    return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis" });
  }

  try {
    const contact = await ContactAgency.create({
      civilite,
      nom,
      prenom,
      email,
      telephone,
      motif,
      message,
      disponibilites,
    });

    res.status(201).json({ message: "Contact créé avec succès", contactId: contact.id });
  } catch (err) {
    console.error("Erreur lors de la création du contact:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactAgency.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "Aucun contact trouvé" });
    }

    res.status(200).json({ contacts });
  } catch (err) {
    console.error("Erreur lors de la récupération des contacts:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const getContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await ContactAgency.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact non trouvé" });
    }

    res.status(200).json({ contact });
  } catch (err) {
    console.error("Erreur lors de la récupération du contact:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await ContactAgency.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact non trouvé" });
    }

    await contact.destroy();
    res.status(200).json({ message: "Contact supprimé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression du contact:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const updateContactStatus = async (req, res) => {
  const { id } = req.params;
  const { isRead } = req.body;

  try {
    const contact = await ContactAgency.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact non trouvé" });
    }

    contact.isRead = isRead;
    await contact.save();

    res.status(200).json({ message: "Statut mis à jour avec succès" });
  } catch (err) {
    console.error("Erreur lors de la mise à jour du statut:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
 


const countContacts = async (req, res) => {
  try {
    const count = await ContactAgency.count();
    res.status(200).json({ count });
  } catch (err) {
    console.error("Erreur lors du comptage des contacts:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
 


module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
  updateContactStatus,
  countContacts
};


