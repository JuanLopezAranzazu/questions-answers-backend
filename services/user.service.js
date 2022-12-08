const pool = require("./../libs/postgres");

class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (error) => console.log(error));
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.pool.query(
        `SELECT *
        FROM   public."user" users
        LEFT   JOIN LATERAL (
           SELECT json_agg(question) AS questions
           FROM   question
           WHERE  question.userId = users.id
           ) question ON true`,
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(res.rows);
            resolve(res.rows);
          }
        }
      );
    });
  }

  findOne(id) {
    console.log(id);
    return new Promise((resolve, reject) => {
      this.pool.query(
        `SELECT *
        FROM   public."user" users
        LEFT   JOIN LATERAL (
           SELECT json_agg(question) AS questions
           FROM   question
           WHERE  question.userId = users.id
           ) question ON true 
           WHERE users.id = $1`,
        [id],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(res.rows[0]);
            resolve(res.rows[0]);
          }
        }
      );
    });
  }

  findByUsername(username) {
    console.log(username);
    return new Promise((resolve, reject) => {
      this.pool.query(
        'SELECT * FROM public."user" WHERE username = $1',
        [username],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(res.rows[0]);
            resolve(res.rows[0]);
          }
        }
      );
    });
  }

  create(payload) {
    const { username, password } = payload;
    console.log(payload);
    return new Promise((resolve, reject) => {
      this.pool.query(
        'INSERT INTO public."user"(username, password) VALUES($1,$2)',
        [username, password],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(res);
            resolve(res);
          }
        }
      );
    });
  }

  update(id, payload) {
    const { username, password } = payload;
    console.log(id, payload);
    return new Promise((resolve, reject) => {
      this.pool.query(
        'UPDATE public."user" SET username = $1, password = $2 WHERE id = $3',
        [username, password, id],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(res);
            resolve(res);
          }
        }
      );
    });
  }

  delete(id) {
    console.log(id);
    return new Promise((resolve, reject) => {
      this.pool.query(
        'DELETE * FROM public."user" WHERE id = $1 RETURNING id',
        [id],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(res);
            resolve(res);
          }
        }
      );
    });
  }
}

module.exports = UserService;
