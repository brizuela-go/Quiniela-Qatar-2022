import flags from "../../flags.json";

export default (req, res) => {
  res.status(200).json(flags);
};
