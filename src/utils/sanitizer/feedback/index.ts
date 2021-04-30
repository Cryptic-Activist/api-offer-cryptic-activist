import sanitizeHtml from 'sanitize-html';
import {
  ISanitizedInputCreateFeedback,
  ISanitizedInputCreateFeedbackReturn,
} from '@interfaces/controllers/feedback';

export function sanitizeInputCreateFeedback(
  countFeedbacksObj: ISanitizedInputCreateFeedback,
): ISanitizedInputCreateFeedbackReturn {
  const feedbackObj: ISanitizedInputCreateFeedbackReturn = {};

  if (countFeedbacksObj.vendor_id) {
    const cleanFeedbackVendorId: string = sanitizeHtml(
      countFeedbacksObj.vendor_id,
      {
        allowedTags: [],
      },
    ).trim();

    feedbackObj.vendor_id = BigInt(cleanFeedbackVendorId);
  }

  if (countFeedbacksObj.user_id) {
    const cleanFeedbackUserId: string = sanitizeHtml(
      countFeedbacksObj.user_id,
      {
        allowedTags: [],
      },
    ).trim();

    feedbackObj.user_id = BigInt(cleanFeedbackUserId);
  }

  if (countFeedbacksObj.offer_id) {
    const cleanFeedbackOfferId: string = sanitizeHtml(
      countFeedbacksObj.offer_id,
      {
        allowedTags: [],
      },
    ).trim();

    feedbackObj.offer_id = BigInt(cleanFeedbackOfferId);
  }

  if (countFeedbacksObj.message) {
    const cleanFeedbackMessage: string = sanitizeHtml(
      countFeedbacksObj.message,
      {
        allowedTags: [],
      },
    ).trim();

    feedbackObj.message = cleanFeedbackMessage;
  }

  if (countFeedbacksObj.type) {
    const cleanFeedbackType: string = sanitizeHtml(countFeedbacksObj.type, {
      allowedTags: [],
    }).trim();

    if (cleanFeedbackType === 'positive') {
      feedbackObj.type = 'positive';
    } else if (cleanFeedbackType === 'negative') {
      feedbackObj.type = 'negative';
    }
  }

  return feedbackObj;
}
