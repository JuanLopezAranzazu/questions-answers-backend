/*users_questions*/
SELECT *
FROM   public."user" users
LEFT   JOIN LATERAL (
   SELECT json_agg(question) AS questions
   FROM   question
   WHERE  question.userId = users.id
   ) question ON true

  
