package com.example.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;

public class BlobSerializer extends JsonSerializer<Blob> {

    @Override
    public void serialize(Blob blob, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        if (blob != null) {
            try {
                byte[] bytes = blob.getBytes(1, (int) blob.length());
                String base64 = Base64.getEncoder().encodeToString(bytes);
                gen.writeString(base64);
            } catch (SQLException e) {
                throw new IOException("Error serializing Blob", e);
            }
        } else {
            gen.writeNull();
        }
    }
}
