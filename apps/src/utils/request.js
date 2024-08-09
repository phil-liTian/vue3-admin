
export class Result {
  static success(data) {
    return {
      code: 200,
      success: true,
      result: data
    }
  }
}
