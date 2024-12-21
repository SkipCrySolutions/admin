export class AppHelper {
  public static formatDateToBindInputField(dateString: string): string {
    const date = new Date(dateString); // Parse the date
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0]; // Format as yyyy-MM-dd
    }
    return '';
  }

  public static validatePassword(password: any) {
    // Regular expression for password validation
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$&#])[A-Za-z\d@$#&]{8,}$/;
    return regex.test(password);
  }

  public static validatePhoneNumber(phone: number) {
    // Regular expression for Indian phone numbers
    const regex = /^[6-9]\d{9}$/;
    return !!phone && regex.test(phone.toString());
  }

  // Function to stringify and save item to localStorage
  public static saveToLocalStorage(key: any, value: any) {
    try {
      if (value) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error saving item to localStorage:', error);
    }
  }

  // Function to parse item from localStorage
  public static getFromLocalStorage(key: string) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error retrieving item from localStorage:', error);
      return null;
    }
  }

  // Function to parse item from localStorage
  public static clearLocalStorage(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error clearing item from localStorage:', error);
    }
  }
}
