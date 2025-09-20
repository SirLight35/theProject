import Content from "../models/Content.model.js";

export const createContent = async (req, res) => {
  try {
    const content = await Content.create(req.body);
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!content) {
      return res.status(404).json({ message: "Could not find the Content" });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllContent = async (req, res) => {
  try {
    const { page = 1, limit = 10, q } = req.query;

    const filter = q ? { title: { $regex: q, $options: "i" } } : {};

    const contents = await Content.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Content.countDocuments(filter);

    res.json({
      data: contents,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate(
      "course",
      "title"
    );
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) {
      return res.status(404).json({ message: "Could not find the Content" });
    }
    res.json("Content Deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
