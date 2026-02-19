import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "네트워크 오류가 발생했습니다.";
    }

    return (
      error.response.data?.error?.message ||
      error.response.data?.message ||
      `오류 코드: ${error.response.status}`
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "알 수 없는 오류가 발생했습니다.";
};

// 사용 예시
/*
catch (error: unknown) {
  const message = getErrorMessage(error);
  setErrorModal(message);
}
*/
