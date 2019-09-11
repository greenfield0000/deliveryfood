package greenfield.group.com.gatecommon;

public class SimpleResult<T> {
    private Status status;
    private String message;
    private T result;

    public SimpleResult() {
    }

    public SimpleResult(Status status, String message, T result) {
        this.status = status;
        this.message = message;
        this.result = result;
    }

    public SimpleResult(Status status, T result) {
        this.status = status;
        this.result = result;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getresult() {
        return result;
    }

    public void setresult(T result) {
        this.result = result;
    }

    @Override
    public String toString() {
        return "SimpleResult{" +
                "message='" + message + '\'' +
                ", result=" + result +
                '}';
    }
}
