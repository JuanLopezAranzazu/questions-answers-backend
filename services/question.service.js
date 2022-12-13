const pool = require("./../libs/postgres");

class QuestionService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (error) => console.log(error));
  }

  findByCategory(categoryId) {
    return new Promise((resolve, reject) => {
      this.pool.query(
        `SELECT *
        FROM   public."question" questions
        LEFT   JOIN LATERAL (
           SELECT json_agg(response) AS answers
           FROM   response
           WHERE  response.questionId = questions.id
           ) response ON true
        LEFT JOIN LATERAL 
        (SELECT to_json(users) AS user FROM public."user" users
        WHERE users.id = questions.userId) users ON true
        WHERE questions.categoryId = $1`,
        [categoryId],
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

  findAll() {
    return new Promise((resolve, reject) => {
      this.pool.query(
        `SELECT *
        FROM   public."question" questions
        LEFT   JOIN LATERAL (
           SELECT json_agg(response) AS answers
           FROM   response
           WHERE  response.questionId = questions.id
           ) response ON true
        LEFT JOIN LATERAL 
        (SELECT to_json(users) AS user FROM public."user" users
        WHERE users.id = questions.userId) users ON true`,
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
        FROM   public."question" questions
        LEFT   JOIN LATERAL (
           SELECT json_agg(response) AS answers
           FROM   response
           LEFT   JOIN LATERAL (
            SELECT to_json(users) AS user
            FROM   public."user" users
            WHERE  response.userId = users.id
            ) users ON true 
           WHERE  response.questionId = questions.id
           ) response ON true 
        LEFT JOIN LATERAL 
        (SELECT to_json(users) AS user FROM public."user" users
        WHERE users.id = questions.userId) users ON true
          WHERE questions.id = $1`,
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
    const { title, description, categoryId, userId } = payload;
    console.log(payload);
    return new Promise((resolve, reject) => {
      this.pool.query(
        'INSERT INTO public."question"(title, description, categoryId, userId) VALUES($1,$2,$3,$4)',
        [title, description, categoryId, userId],
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
    const { title, description, categoryId, userId } = payload;
    console.log(id, payload);
    return new Promise((resolve, reject) => {
      this.pool.query(
        'UPDATE public."question" SET title = $1, description = $2, categoryId = $3, userId = $4 WHERE id = $5',
        [title, description, categoryId, userId, id],
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
        'DELETE * FROM public."question" WHERE id = $1 RETURNING id',
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

module.exports = QuestionService;
