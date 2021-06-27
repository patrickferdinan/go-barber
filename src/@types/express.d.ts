// Anexa ao request a tipagens que eu quero adicionar para ele.
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}