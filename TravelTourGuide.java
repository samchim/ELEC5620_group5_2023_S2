public class TravelTourGuide{
    private static LLModel llm;
    private static LocationGetter locationGetter;
    public static void main(String[] args) {
        System.out.println(llm.chatGPT("tell me what chatgpt is"));
    }
}