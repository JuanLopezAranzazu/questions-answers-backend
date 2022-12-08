const pool = require("./../libs/postgres");

class ResponseService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (error) => console.log(error));
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.pool.query(
        'SELECT * FROM public."response" WHERE true',
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
        'SELECT * FROM public."response" WHERE id = $1',
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

  create(payload) {
    const { text, questionId, userId } = payload;
    console.log(payload);
    return new Promise((resolve, reject) => {
      this.pool.query(
        'INSERT INTO public."response"(text, questionId, userId) VALUES($1,$2,$3)',
        [text, questionId, userId],
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
    const { text, questionId, userId } = payload;
    console.log(id, payload);
    return new Promise((resolve, reject) => {
      this.pool.query(
        'UPDATE public."response" SET text = $1, questionId = $2, userId = $3 WHERE id = $4',
        [text, questionId, userId, id],
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
        'DELETE * FROM public."response" WHERE id = $1 RETURNING id',
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

module.exports = ResponseService;
