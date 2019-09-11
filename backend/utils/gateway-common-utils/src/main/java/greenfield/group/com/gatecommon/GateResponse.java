package greenfield.group.com.gatecommon;

public class GateResponse<T> {

    private SimpleResult<T> result;

    public GateResponse(SimpleResult<T> result) {
        this.result = result;
    }

    public SimpleResult<T> getResult() {
        return result;
    }
}
