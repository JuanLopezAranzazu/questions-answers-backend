const pool = require("./../libs/postgres");

class CategoryService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (error) => console.log(error));
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.pool.query(
        'SELECT * FROM public."category" WHERE true',
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
        'SELECT * FROM public."category" WHERE id = $1',
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
    const { name } = payload;
    console.log(payload);
    return new Promise((resolve, reject) => {
      this.pool.query(
        'INSERT INTO public."category"(name) VALUES($1)',
        [name],
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
    const { name } = payload;
    console.log(id, payload);
    return new Promise((resolve, reject) => {
      this.pool.query(
        'UPDATE public."category" SET name = $1 WHERE id = $2',
        [name, id],
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
        'DELETE * FROM public."category" WHERE id = $1 RETURNING id',
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

module.exports = CategoryService;
