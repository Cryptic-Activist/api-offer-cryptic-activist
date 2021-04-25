import sanitizeHtml from 'sanitize-html';
import {
  ICreateOffer,
  ISanitizedCreateOffer,
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

export function sanitizeInputGetOfferByVendor(getOfferObj: {
  vendor_id: string;
  payment_method_type: string;
}): {
  vendor_id: string;
  payment_method_type: string;
} {
  const cleanVendorId: string = sanitizeHtml(getOfferObj.vendor_id, {
    allowedTags: [],
  }).trim();
  const cleanPaymentMethodType: string = sanitizeHtml(
    getOfferObj.payment_method_type,
    {
      allowedTags: [],
    },
  ).trim();

  return {
    vendor_id: cleanVendorId,
    payment_method_type: cleanPaymentMethodType,
  };
}

export function sanitizeInputGetOfferById(getOfferObj: {
  offer_id: string;
}): {
  offer_id: string;
} {
  const cleanOfferId: string = sanitizeHtml(getOfferObj.offer_id, {
    allowedTags: [],
  }).trim();

  return {
    offer_id: cleanOfferId,
  };
}
