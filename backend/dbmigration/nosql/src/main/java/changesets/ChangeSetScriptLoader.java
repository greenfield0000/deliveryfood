package changesets;


import java.io.*;
import java.net.URL;

/**
 * Вспомогательный класс для загрузки скриптов из папки ресурсов
 */
public class ChangeSetScriptLoader {

    /**
     * Метод загрузки скрипта по пути до файла
     *
     * @param path путь до файла
     * @return возвращает содержимое скрипта
     * @throws IOException
     */
    public String getDocumentFromResourceByPath(String path) throws IOException {
        final URL resource = this.getClass().getClassLoader().getResource(path);
        if (resource == null) {
            throw new IllegalArgumentException("File from resource as name "
                    + path
                    + " not found!!!");
        }

        StringBuilder builder = new StringBuilder();
        try (Reader reader = new FileReader(new File(resource.getPath()));
             BufferedReader bufferedReader = new BufferedReader(reader)) {

            String line = "";
            do {
                builder.append(line);
                line = bufferedReader.readLine();
            } while (line != null);
        }
        return builder.toString();
    }

}
