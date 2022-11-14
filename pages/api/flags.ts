import flags from "../../flags.json";

export default function handler(req, res) {
  res.status(200).json(flags);
}
