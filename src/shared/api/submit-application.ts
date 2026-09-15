export interface ApplicationPayload {
  name: string;
  phone: string;
  email: string;
  courseId: string;
}

export type SubmitApplicationResult = { ok: true } | { ok: false; error: string };

/**
 * Единственная точка отправки заявок. Конечная точка не выбрана заказчиком
 * (кандидаты: бэкенд SBA, Telegram-бот, CRM) — см. docs/architecture.md.
 * При выборе меняется только этот файл.
 */
export async function submitApplication(
  payload: ApplicationPayload,
): Promise<SubmitApplicationResult> {
  // TODO: заменить заглушку на реальный эндпоинт
  console.info('[stub] submitApplication', payload);
  return { ok: true };
}
