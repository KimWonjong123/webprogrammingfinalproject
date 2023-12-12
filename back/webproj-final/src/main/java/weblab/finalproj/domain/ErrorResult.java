package weblab.finalproj.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ErrorResult {
    private int code;
    private List<String> message;
}
