import sanitizeHtml from 'sanitize-html';
import {
  ISanitizedInputIndexFeedbackPagination,
  ISanitizedInputIndexFeedbackPaginationReturn,
} from '@interfaces/controllers/feedback';

export function sanitizeInputIndexFeedbackPagination(
  query: { limit: string; skip: string },
  feedbackIndexObj: ISanitizedInputIndexFeedbackPagination,
): ISanitizedInputIndexFeedbackPaginationReturn {
  const queryObj: { limit?: number; skip?: number } = {};
  const feedbackObj: {
    vendor_id?: BigInt;
    user_id?: BigInt;
    offer_id?: BigInt;
    message?: string;
    type?: 'positive' | 'negative';
  } = {};

  if (query.limit) {
    const cleanQueryObjLimit: string = sanitizeHtml(query.limit, {
      allowedTags: [],
    }).trim();

    queryObj.limit = Number(cleanQueryObjLimit);
  }

  if (query.skip) {
    const cleanQueryObjSkip: string = sanitizeHtml(query.skip, {
      allowedTags: [],
    }).trim();

    queryObj.skip = Number(cleanQueryObjSkip);
  }

  if (feedbackIndexObj.vendor_id) {
    const cleanFeedbackVendorId: string = sanitizeHtml(
      feedbackIndexObj.vendor_id,
      {
        allowedTags: [],
      },
    ).trim();

    feedbackObj.vendor_id = BigInt(cleanFeedbackVendorId);
  }

  if (feedbackIndexObj.user_id) {
    const cleanFeedbackUserId: string = sanitizeHtml(feedbackIndexObj.user_id, {
      allowedTags: [],
    }).trim();

    feedbackObj.user_id = BigInt(cleanFeedbackUserId);
  }

  if (feedbackIndexObj.offer_id) {
    const cleanFeedbackOfferId: string = sanitizeHtml(
      feedbackIndexObj.offer_id,
      {
        allowedTags: [],
      },
    ).trim();

    feedbackObj.offer_id = BigInt(cleanFeedbackOfferId);
  }

  if (feedbackIndexObj.message) {
    const cleanFeedbackMessage: string = sanitizeHtml(
      feedbackIndexObj.message,
      {
        allowedTags: [],
      },
    ).trim();

    feedbackObj.message = cleanFeedbackMessage;
  }

  if (feedbackIndexObj.type) {
    const cleanFeedbackType: string = sanitizeHtml(feedbackIndexObj.type, {
      allowedTags: [],
    }).trim();

    if (cleanFeedbackType === 'positive') {
      feedbackObj.type = 'positive';
    } else if (cleanFeedbackType === 'negative') {
      feedbackObj.type = 'negative';
    }
  }

  return { query: queryObj, feedback: feedbackObj };
}
