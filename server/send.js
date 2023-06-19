const axios = require("axios");

const validateNotEmpty = (value, fieldName) => {
  if (!value) {
    throw `${fieldName} parameter is mandatory`;
  }
};

const buildUrl = (domain) => {
  return `https://${domain}/sms/2/text/advanced`;
};

const buildHeaders = (apiKey) => {
  return {
    "Content-Type": "application/json",
    Authorization: `App ${apiKey}`,
  };
};

const buildAxiosConfig = (apiKey) => {
  return {
    headers: buildHeaders(apiKey),
  };
};

const buildRequestBody = (destinationNumber,message,schedule_time,from) => {

  const messageObject = {
    destinations: destinationNumber.map((onenumber) => ({ to: onenumber })),
    from: from,
    sendAt: schedule_time,
    text: message,
    intermediateReport: true,
    notifyUrl: "https://fe86-45-251-228-145.ngrok-free.app/delivery-report",
    notifyContentType: "application/json",
    callbackData: "hello from codelab",
  };
  return {
    messages: [messageObject],
  };
};

const parseSuccessResponse = (axiosResponse) => {
  const responseBody = axiosResponse.data;
  const singleMessageResponse = responseBody.messages[0];
  return {
    success: true,
    messageId: singleMessageResponse.messageId,
    status: singleMessageResponse.status.name,
    //category: singleMessageResponse.status.groupName,
    description: singleMessageResponse.status.description,

  };
};

const parseFailedResponse = (axiosError) => {
  if (axiosError.response) {
    const responseBody = axiosError.response.data;
    return {
      success: false,
      errorMessage: responseBody.requestError.serviceException.text,
      errorDetails: responseBody,
    };
  }
  return {
    success: false,
    errorMessage: axiosError.message,
  };
};

const sendSms =(config, destinationNumber, message,schedule_time,from) => {
  validateNotEmpty(config.domain, "config.domain");
  validateNotEmpty(config.apiKey, "config.apiKey");
  validateNotEmpty(destinationNumber, "destinationNumber");
  validateNotEmpty(from, "from");
  validateNotEmpty(message, "message");
  validateNotEmpty(schedule_time, "schedule_time");

  const url = buildUrl(config.domain);
  const requestBody = buildRequestBody(destinationNumber, message,schedule_time,from);
  const axiosConfig = buildAxiosConfig(config.apiKey);

  console.log(" body ", JSON.stringify(requestBody, null, 2));

  return axios
    .post(url, requestBody, axiosConfig)
    .then((res) => parseSuccessResponse(res))
    .catch((err) => parseFailedResponse(err));
};

module.exports = sendSms;
