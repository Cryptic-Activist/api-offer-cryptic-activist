import sanitizeHtml from 'sanitize-html';
import {
  ICreateOffer,
  ISanitizedCreateOffer,
  ISanitizedGetOffer,
  ISanitizedGetOfferReturn,
  ISanitizedInputCountFeedbacks,
  ISanitizedInputCountFeedbacksReturn,
} from '@interfaces/controllers/offer';

export function sanitizeInputCreateOffer(
  createOfferObj: ICreateOffer,
): ISanitizedCreateOffer {
  const cleanVendorId: string = sanitizeHtml(createOfferObj.vendor_id, {
    allowedTags: [],
  }).trim();
  const cleanCryptocurrencyId: string = sanitizeHtml(
    createOfferObj.cryptocurrency_id,
    {
      allowedTags: [],
    },
  ).trim();
  const cleanPaymentMethodType: string = sanitizeHtml(
    createOfferObj.payment_method_type,
    {
      allowedTags: [],
    },
  ).trim();
  const cleanPaymentMethodId: string = sanitizeHtml(
    createOfferObj.payment_method_id,
    {
      allowedTags: [],
    },
  ).trim();
  const cleanTradePricingType: string = sanitizeHtml(
    createOfferObj.trade_pricing_type,
    {
      allowedTags: [],
    },
  ).trim();
  const cleanFiatId: string = sanitizeHtml(createOfferObj.fiat_id, {
    allowedTags: [],
  }).trim();
  const cleanTradeInstructionsTags: string[] = createOfferObj.trade_instructions_tags.map(
    (tag) =>
      sanitizeHtml(tag, {
        allowedTags: [],
      }).trim(),
  );
  const cleanTradeInstructionsLabel: string = sanitizeHtml(
    createOfferObj.trade_instructions_label,
    {
      allowedTags: [],
    },
  ).trim();
  const cleanTradeInstructionsTerms: string = sanitizeHtml(
    createOfferObj.trade_instructions_terms,
    {
      allowedTags: [],
    },
  ).trim();
  const cleanTradeInstructionsInstructions: string = sanitizeHtml(
    createOfferObj.trade_instructions_instructions,
    {
      allowedTags: [],
    },
  ).trim();

  return {
    vendor_id: cleanVendorId,
    cryptocurrency_id: cleanCryptocurrencyId,
    payment_method_type: cleanPaymentMethodType,
    payment_method_id: cleanPaymentMethodId,
    fiat_id: cleanFiatId,
    trade_pricing_type: cleanTradePricingType,
    trade_pricing_list_at: createOfferObj.trade_pricing_list_at,
    trade_pricing_trade_limits_min:
      createOfferObj.trade_pricing_trade_limits_min,
    trade_pricing_trade_limits_max:
      createOfferObj.trade_pricing_trade_limits_max,
    trade_pricing_time_limit: createOfferObj.trade_pricing_time_limit,
    trade_instructions_tags: cleanTradeInstructionsTags,
    trade_instructions_label: cleanTradeInstructionsLabel,
    trade_instructions_terms: cleanTradeInstructionsTerms,
    trade_instructions_instructions: cleanTradeInstructionsInstructions,
  };
}

export function sanitizeInputGetOffer(
  getOfferObj: ISanitizedGetOffer,
): ISanitizedGetOfferReturn {
  const offerObj: ISanitizedGetOfferReturn = {};

  if (getOfferObj.id) {
    const cleanOfferId: string = sanitizeHtml(getOfferObj.id, {
      allowedTags: [],
    }).trim();

    offerObj.id = BigInt(cleanOfferId);
  }

  if (getOfferObj.vendor_id) {
    const cleanOfferVendorId: string = sanitizeHtml(getOfferObj.vendor_id, {
      allowedTags: [],
    }).trim();

    offerObj.vendor_id = BigInt(cleanOfferVendorId);
  }

  if (getOfferObj.cryptocurrency_id) {
    const cleanOfferCryptocurrencyId: string = sanitizeHtml(
      getOfferObj.cryptocurrency_id,
      {
        allowedTags: [],
      },
    ).trim();

    offerObj.cryptocurrency_id = BigInt(cleanOfferCryptocurrencyId);
  }

  if (getOfferObj.payment_method_type) {
    const cleanOfferPaymentMethodType: string = sanitizeHtml(
      getOfferObj.payment_method_type,
      {
        allowedTags: [],
      },
    ).trim();

    offerObj.payment_method_type = cleanOfferPaymentMethodType;
  }

  if (getOfferObj.payment_method_id) {
    const cleanOfferPaymentMethodId: string = sanitizeHtml(
      getOfferObj.payment_method_id,
      {
        allowedTags: [],
      },
    ).trim();

    offerObj.payment_method_id = BigInt(cleanOfferPaymentMethodId);
  }

  if (getOfferObj.fiat_id) {
    const cleanOfferFiatId: string = sanitizeHtml(getOfferObj.fiat_id, {
      allowedTags: [],
    }).trim();

    offerObj.fiat_id = BigInt(cleanOfferFiatId);
  }

  if (getOfferObj.trade_pricing_type) {
    const cleanOfferTradePricingType: string = sanitizeHtml(
      getOfferObj.trade_pricing_type,
      {
        allowedTags: [],
      },
    ).trim();

    offerObj.trade_pricing_type = cleanOfferTradePricingType;
  }

  if (getOfferObj.trade_pricing_list_at) {
    const cleanOfferTradePricingType: string = sanitizeHtml(
      getOfferObj.trade_pricing_list_at.toString(),
      {
        allowedTags: [],
      },
    ).trim();

    offerObj.trade_pricing_list_at = Number(cleanOfferTradePricingType);
  }

  if (getOfferObj.trade_pricing_trade_limits_min) {
    const cleanOfferTradePricingLimitsMin: string = sanitizeHtml(
      getOfferObj.trade_pricing_trade_limits_min.toString(),
      {
        allowedTags: [],
      },
    ).trim();

    offerObj.trade_pricing_trade_limits_min = Number(
      cleanOfferTradePricingLimitsMin,
    );
  }

  if (getOfferObj.trade_pricing_trade_limits_max) {
    const cleanOfferTradePricingLimitsMax: string = sanitizeHtml(
      getOfferObj.trade_pricing_trade_limits_max.toString(),
      {
        allowedTags: [],
      },
    ).trim();

    offerObj.trade_pricing_trade_limits_max = Number(
      cleanOfferTradePricingLimitsMax,
    );
  }

  if (getOfferObj.trade_pricing_time_limit) {
    const cleanOfferTradePricingTimeLimit: string = sanitizeHtml(
      getOfferObj.trade_pricing_time_limit.toString(),
      {
        allowedTags: [],
      },
    ).trim();

    offerObj.trade_pricing_time_limit = Number(cleanOfferTradePricingTimeLimit);
  }

  if (getOfferObj.trade_instructions_tags) {
    const cleanOfferTradeInstructionsTags: string[] = getOfferObj.trade_instructions_tags.map(
      (tag) =>
        sanitizeHtml(tag, {
          allowedTags: [],
        }).trim(),
    );

    offerObj.trade_instructions_tags = cleanOfferTradeInstructionsTags;
  }

  if (getOfferObj.trade_instructions_label) {
    const cleanOfferTradeInstructionsLabel: string = sanitizeHtml(
      getOfferObj.trade_instructions_label,
      {
        allowedTags: [],
      },
    ).trim();

    offerObj.trade_instructions_label = cleanOfferTradeInstructionsLabel;
  }

  if (getOfferObj.trade_instructions_label) {
    const cleanOfferTradeInstructionsLabel: string = sanitizeHtml(
      getOfferObj.trade_instructions_label,
      {
        allowedTags: [],
      },
    ).trim();

    offerObj.trade_instructions_label = cleanOfferTradeInstructionsLabel;
  }

  if (getOfferObj.trade_instructions_terms) {
    const cleanOfferTradeInstructionsTerms: string = sanitizeHtml(
      getOfferObj.trade_instructions_terms,
      {
        allowedTags: [],
      },
    ).trim();

    offerObj.trade_instructions_terms = cleanOfferTradeInstructionsTerms;
  }

  if (getOfferObj.trade_instructions_instructions) {
    const cleanOfferTradeInstructionsInstructions: string = sanitizeHtml(
      getOfferObj.trade_instructions_instructions,
      {
        allowedTags: [],
      },
    ).trim();

    offerObj.trade_instructions_instructions = cleanOfferTradeInstructionsInstructions;
  }

  return offerObj;
}

export function sanitizeInputCountFeedbacks(
  countFeedbacksObj: ISanitizedInputCountFeedbacks,
): ISanitizedInputCountFeedbacksReturn {
  const feedbackObj: ISanitizedInputCountFeedbacksReturn = {};

  if (countFeedbacksObj.id) {
    const cleanFeedbackId: string = sanitizeHtml(countFeedbacksObj.id, {
      allowedTags: [],
    }).trim();

    feedbackObj.id = BigInt(cleanFeedbackId);
  }

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

    feedbackObj.type = cleanFeedbackType;
  }

  return feedbackObj;
}
