import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/turso';

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface QuestionRequest {
  question: string;
  prize: string;
  answers: Answer[];
}

interface DeleteQuestionRequest {
  question: string;
}

interface DeleteQuestionResponse {
  success: boolean;
  message?: string;
  error?: string;
  deletedIds?: number[];
}

export async function GET() {
  try {
    const { rows: questions } = await db.execute('SELECT * FROM questions');

    const { rows: answers } = await db.execute('SELECT * FROM answers');

    const questionsWithAnswers = questions.map((question) => ({
      ...question,
      answers: answers.filter((answer) => answer.question_id === question.id),
    }));

    return Response.json({ success: true, data: questionsWithAnswers });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return Response.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: QuestionRequest = await request.json();

    if (
      !body.question ||
      !body.prize ||
      !Array.isArray(body.answers) ||
      body.answers.length < 2
    ) {
      return NextResponse.json(
        { success: false, error: 'Invalid data format' },
        { status: 400 },
      );
    }

    const result = await db.execute({
      sql: 'INSERT INTO questions (question, prize) VALUES (?, ?)',
      args: [body.question, body.prize],
    });

    if (result.rowsAffected === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to insert question' },
        { status: 500 },
      );
    }

    const questionId = Number(result.lastInsertRowid);

    const answerPromises = body.answers.map((answer) =>
      db.execute({
        sql: 'INSERT INTO answers (question_id, text, is_correct) VALUES (?, ?, ?)',
        args: [questionId, answer.text, answer.isCorrect ? 1 : 0],
      }),
    );

    await Promise.all(answerPromises);
    return NextResponse.json(
      { success: true, message: 'Question and answers added', questionId },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
): Promise<NextResponse<DeleteQuestionResponse>> {
  try {
    const body: DeleteQuestionRequest = await request.json();

    if (!body.question) {
      return NextResponse.json(
        { success: false, error: 'Question text is required' },
        { status: 400 },
      );
    }

    const { rows: questions } = await db.execute({
      sql: 'SELECT id FROM questions WHERE question = ?',
      args: [body.question],
    });

    if (questions.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No matching questions found' },
        { status: 404 },
      );
    }

    const questionIds: number[] = questions.map((q) => Number(q.id));

    await db.execute({
      sql: `DELETE FROM answers WHERE question_id IN (${questionIds.map(() => '?').join(',')})`,
      args: questionIds,
    });

    await db.execute({
      sql: `DELETE FROM questions WHERE id IN (${questionIds.map(() => '?').join(',')})`,
      args: questionIds,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Questions and answers deleted',
        deletedIds: questionIds,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 },
    );
  }
}
