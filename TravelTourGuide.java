/*
public class TravelTourGuide{
    /**
     *void main为程序的入口点
     *@param args为main函数的参数
     
    public static void main(String[]args){
        int number = 100;
        System.out.println(number);
    }
}
*/
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.OutputStreamWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSession;

public class TravelTourGuide {

   public static String chatGPT(String prompt) {
       String url = "https://api.openai.com/v1/chat/completions";
       String apiKey = "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";
       String model = "gpt-3.5-turbo";
       URL obj;
       try {
           obj = new URL(url);
           java.net.HttpURLConnection connection = (java.net.HttpURLConnection) obj.openConnection();
           connection.setRequestMethod("POST");
           connection.setRequestProperty("Authorization", "Bearer " + apiKey);
           connection.setRequestProperty("Content-Type", "application/json");

           // The request body
           String body = "{\"model\": \"" + model + "\", \"messages\": [{\"role\": \"user\", \"content\": \"" + prompt + "\"}]}";
           connection.setDoOutput(true);
           OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
           writer.write(body);
           writer.flush();
           writer.close();

           // Response from ChatGPT
           BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
           String line;

           StringBuffer response = new StringBuffer();

           while ((line = br.readLine()) != null) {
               response.append(line);
           }
           br.close();

           // calls the method to extract the message.
           return extractMessageFromJSONResponse(response.toString());

       } catch (IOException e) {
           throw new RuntimeException(e);
       }
   }

   public static String extractMessageFromJSONResponse(String response) {
       int start = response.indexOf("content")+ 11;

       int end = response.indexOf("\"", start);

       return response.substring(start, end);

   }

   

   public static void main(String[] args) {

       System.out.println(chatGPT("The tourist have arrive Sydney Opera House. It is a attraction site build on 1911. It is opening at 9am to 7pm. It can be accessed by bus 188, 190 and train 5. Generate a short article tell the above information to the tourist"));

   }
}