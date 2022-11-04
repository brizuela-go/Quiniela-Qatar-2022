import faseDeGrupos from '../../faseDeGrupos.json';

export default function handler(req, res) {
  res.status(200).json(faseDeGrupos)
}