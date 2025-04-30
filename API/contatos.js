export default async function handler(req, res) {
  const operadoras = [
    { nome: "Oi", codigo: 14, categoria: "Celular", preco: 2 },
    { nome: "Vivo", codigo: 15, categoria: "Celular", preco: 1 },
    { nome: "Tim", codigo: 41, categoria: "Celular", preco: 3 },
    { nome: "GVT", codigo: 25, categoria: "Fixo", preco: 1 },
    { nome: "Embratel", codigo: 21, categoria: "Fixo", preco: 2 }
  ];

  let contatos = [
    { id: 1, nome: "Bruno", telefone: "9999-2222", data: new Date(), operadora: operadoras[0] },
    { id: 2, nome: "Sandra", telefone: "9999-3333", data: new Date(), operadora: operadoras[1] },
    { id: 3, nome: "Mariana", telefone: "9999-9999", data: new Date(), operadora: operadoras[2] }
  ];

  if (req.method === 'GET') {
    if (req.query.id) {
      const contato = contatos.find(c => c.id == req.query.id);
      return contato ? res.status(200).json(contato) : res.status(404).end();
    }
    return res.status(200).json(contatos);
  }

  if (req.method === 'POST') {
    // Pega o corpo da requisição manualmente
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const novoContato = JSON.parse(body);
        contatos.push(novoContato);
        res.status(201).json(true);
      } catch (e) {
        res.status(400).json({ erro: 'JSON inválido' });
      }
    });
    return;
  }

  res.status(405).end(); // Método não permitido !!
}