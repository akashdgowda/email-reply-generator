package com.email.writer.app;

import lombok.AllArgsConstructor;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import java.util.logging.Logger;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {
    
    private final EmailGeneratorService emailGeneratorService;
    //private static final Logger logger = (Logger) LoggerFactory.getLogger(EmailGeneratorController.class);

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        return  ResponseEntity.ok(response); //send generated email reply
    }
}
