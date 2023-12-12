package weblab.finalproj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class WebprojFinalApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebprojFinalApplication.class, args);
    }

}
